# If you running in development environment or internal env, please ignore Chocolately, NATS Server, Redis
## Installation
Run all commands below in Administrator privileges

#### 1. Install Chocolately
`@powershell -NoProfile -ExecutionPolicy Bypass -Command "[System.Net.WebRequest]::DefaultWebProxy.Credentials = [System.Net.CredentialCache]::DefaultCredentials; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH="%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

#### 2. Install NATS Server
`choco install gnatsd`

#### 3. Install Moleculer-Cli
`npm i moleculer-cli -g`

#### 4. Move to repo folder and install packages
* `cd <repo_folder_location>`
* `npm install`

## 
## Run
#### 1. Start NATS Server
`gnatsd`

#### 2. Move to the repo folder and start Msig Api
* `cd <repo_folder_location>`
* `npm run dev`


## 
## For Developer
#### 1. Start NATS Server + Redis cache
`npm run start-nats`

#### 2. Run application
`npm run dev`

# Deployment
1. Copy folder `src` to folder `SmartTravelAPI`
2. Open `Services Management` > check if the windows service of this API is running or not
    Note: If it's running, please restart the window service and ignore the rest
3. Open `cmd` or `Node.js command prompt` as Administrator
4. Type `qckwinsvc` and follows the CLI instructions (the Node script path should be: /src/index.js, ex: C:\SmartTravel\SmartTravel_API\src\index.js)
    Note: `qckwinsvc` should be installed in the hosting machine before this step