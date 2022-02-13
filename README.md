# Snake game client app

## How to install

### Using Git

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/Andrii-25/snake-game-front.git ./myproject
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create new file by copying and pasting the file and then renaming them to just `.env`

    ```bash
    cp .env.example .env
    ```

3.  The files `.env` is already ignored, so you never commit your credentials.

## How to run

### Running React app locally

```bash
cd myproject
npm start
```

**Note:** `REACT_APP_API_URL` will be your API server URL.
