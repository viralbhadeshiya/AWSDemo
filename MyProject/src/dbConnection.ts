import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'

/**
 * Database manager class
 */
export class Database {
    private connectionManager: ConnectionManager

    constructor() {
        this.connectionManager = getConnectionManager()
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = `default`

        let connection: Connection

        if (this.connectionManager.has(CONNECTION_NAME)) {
            connection = await this.connectionManager.get(CONNECTION_NAME)

            if (!connection.isConnected) {
                connection = await connection.connect()
            }
        }
        else {

            const connectionOptions: ConnectionOptions = {
                name: `default`,
                type: `postgres`,
                port: 5432,
                synchronize: true,
                logging: true,
                host: process.env.DB_HOST,
                username: process.env.DB_USERNAME,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                entities: [
                    __dirname + "/entities/*.*"
                ]
            }

            // Don't need a pwd locally
            if (process.env.DB_PASSWORD) {
                Object.assign(connectionOptions, {
                    password: process.env.DB_PASSWORD
                })
            }
            
            connection = await createConnection(connectionOptions)
        }

        return connection
    }
}
