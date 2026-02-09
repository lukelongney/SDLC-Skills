<#
.SYNOPSIS
    Imports the SDLC Skills Framework page into Confluence Cloud.

.DESCRIPTION
    This script imports the SDLC Skills Architecture XHTML file into Confluence Cloud
    using the REST API. It prompts for all required values.

.NOTES
    Requires: PowerShell 5.1 or later
    API Token: Generate at https://id.atlassian.com/manage-profile/security/api-tokens
#>

[CmdletBinding()]
param()

# Banner
Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  SDLC Skills Framework - Confluence Importer" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Check if XHTML file exists
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$xhtmlFile = Join-Path $scriptDir "confluence-import.xhtml"

if (-not (Test-Path $xhtmlFile)) {
    Write-Host "ERROR: Cannot find confluence-import.xhtml in $scriptDir" -ForegroundColor Red
    exit 1
}

Write-Host "Found: $xhtmlFile" -ForegroundColor Green
Write-Host ""

# Prompt for user values
Write-Host "Please provide your Confluence Cloud details:" -ForegroundColor Yellow
Write-Host ""

# Domain
$domain = Read-Host "Confluence domain (e.g., mycompany.atlassian.net)"
if ([string]::IsNullOrWhiteSpace($domain)) {
    Write-Host "ERROR: Domain is required" -ForegroundColor Red
    exit 1
}
# Remove https:// if included
$domain = $domain -replace "^https?://", "" -replace "/$", ""

# Email
$email = Read-Host "Your Atlassian account email"
if ([string]::IsNullOrWhiteSpace($email)) {
    Write-Host "ERROR: Email is required" -ForegroundColor Red
    exit 1
}

# API Token (secure input)
Write-Host ""
Write-Host "API Token (generate at https://id.atlassian.com/manage-profile/security/api-tokens)" -ForegroundColor Gray
$secureToken = Read-Host "API Token" -AsSecureString
$apiToken = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
)
if ([string]::IsNullOrWhiteSpace($apiToken)) {
    Write-Host "ERROR: API Token is required" -ForegroundColor Red
    exit 1
}

# Space Key
Write-Host ""
$spaceKey = Read-Host "Space key (e.g., PROJ, ARCH, DEV)"
if ([string]::IsNullOrWhiteSpace($spaceKey)) {
    Write-Host "ERROR: Space key is required" -ForegroundColor Red
    exit 1
}
$spaceKey = $spaceKey.ToUpper()

# Page Title
Write-Host ""
$defaultTitle = "SDLC Skills Framework"
$pageTitle = Read-Host "Page title [$defaultTitle]"
if ([string]::IsNullOrWhiteSpace($pageTitle)) {
    $pageTitle = $defaultTitle
}

# Parent Page (optional)
Write-Host ""
Write-Host "Optional: Enter a parent page ID to nest this page under an existing page." -ForegroundColor Gray
Write-Host "Leave blank to create at the space root." -ForegroundColor Gray
$parentPageId = Read-Host "Parent page ID (optional)"

# Confirmation
Write-Host ""
Write-Host "Configuration Summary:" -ForegroundColor Cyan
Write-Host "  Domain:      $domain"
Write-Host "  Email:       $email"
Write-Host "  Space:       $spaceKey"
Write-Host "  Title:       $pageTitle"
if (-not [string]::IsNullOrWhiteSpace($parentPageId)) {
    Write-Host "  Parent ID:   $parentPageId"
}
Write-Host ""

$confirm = Read-Host "Proceed with import? (Y/n)"
if ($confirm -eq "n" -or $confirm -eq "N") {
    Write-Host "Import cancelled." -ForegroundColor Yellow
    exit 0
}

# Read XHTML content
Write-Host ""
Write-Host "Reading XHTML content..." -ForegroundColor Gray
$content = Get-Content $xhtmlFile -Raw -Encoding UTF8

# Escape for JSON
$contentEscaped = $content -replace '\\', '\\\\' -replace '"', '\"' -replace "`r`n", '\n' -replace "`n", '\n' -replace "`t", '\t'

# Build request body
$bodyObj = @{
    type = "page"
    title = $pageTitle
    space = @{
        key = $spaceKey
    }
    body = @{
        storage = @{
            value = $content
            representation = "storage"
        }
    }
}

# Add parent page if specified
if (-not [string]::IsNullOrWhiteSpace($parentPageId)) {
    $bodyObj.ancestors = @(
        @{
            id = $parentPageId
        }
    )
}

$bodyJson = $bodyObj | ConvertTo-Json -Depth 10 -Compress

# Create auth header
$authBytes = [System.Text.Encoding]::ASCII.GetBytes("${email}:${apiToken}")
$authBase64 = [Convert]::ToBase64String($authBytes)

$headers = @{
    "Authorization" = "Basic $authBase64"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

$uri = "https://$domain/wiki/rest/api/content"

# Make the request
Write-Host "Creating page in Confluence..." -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $bodyJson -ErrorAction Stop

    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Page created:" -ForegroundColor Cyan
    Write-Host "  Title:  $($response.title)"
    Write-Host "  ID:     $($response.id)"
    Write-Host "  URL:    https://$domain/wiki$($response._links.webui)"
    Write-Host ""
    Write-Host "Open in browser? (Y/n)" -ForegroundColor Yellow
    $openBrowser = Read-Host
    if ($openBrowser -ne "n" -and $openBrowser -ne "N") {
        Start-Process "https://$domain/wiki$($response._links.webui)"
    }
}
catch {
    Write-Host "ERROR: Failed to create page" -ForegroundColor Red
    Write-Host ""

    $errorResponse = $_.ErrorDetails.Message
    if ($errorResponse) {
        try {
            $errorObj = $errorResponse | ConvertFrom-Json
            Write-Host "Message: $($errorObj.message)" -ForegroundColor Red
            if ($errorObj.data.authorized -eq $false) {
                Write-Host ""
                Write-Host "Authentication failed. Please check:" -ForegroundColor Yellow
                Write-Host "  1. Your email address is correct"
                Write-Host "  2. Your API token is valid (not expired)"
                Write-Host "  3. You have permission to create pages in space '$spaceKey'"
            }
            if ($errorObj.message -like "*already exists*") {
                Write-Host ""
                Write-Host "A page with this title already exists. Try a different title." -ForegroundColor Yellow
            }
        }
        catch {
            Write-Host $errorResponse -ForegroundColor Red
        }
    }
    else {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }

    exit 1
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
