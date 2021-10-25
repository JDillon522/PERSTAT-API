import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class DatabaseService {
    private dbUrl: string = this.config.get<string>('DATABASE_URL');
    public client: Client;

    constructor(
        private config: ConfigService,
    ) {
        this.client = new Client({
            connectionString: this.dbUrl,
            ssl: {
                rejectUnauthorized: false
            }
        });

        this.client.connect();
    }


}
