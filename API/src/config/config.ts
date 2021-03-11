const config:IConfig = {
    db: {
        Username: "",
        Password: "",
        IP: "",
        DB: ""
    }
}

interface IConfig {
    db: {
        Username: string,
        Password: string,
        IP: string,
        DB: string
    }
}

export = config
