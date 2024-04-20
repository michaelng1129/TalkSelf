import React, { useEffect } from 'react';
import { open, QueryResult } from 'react-native-quick-sqlite';
import mountDatabase from './dictionary';

const YourComponent = () => {
    useEffect(() => {
        mountDatabase().then(() => {
            
            connectAndPrintFirstRecord();
        });
    }, []);

    const connectAndPrintFirstRecord = async () => {
        try {
            // 连接数据库
            const db = open({ name: 'EngDB.sqlite' });
            await db.execute('CREATE INDEX IF NOT EXISTS idx_word ON words (word);');
            console.log('Index "idx_word" created');
    
            // 查询第一个记录
            const result: QueryResult = await db.execute('SELECT * FROM words LIMIT 1;');
            if (result.rows && result.rows.length > 0) {
                console.log('First record:', result.rows.item(0));
            } else {
                console.log('No records found');
            }
        } catch (error: any) {
            console.error('Error connecting to database or querying first record:', error.message);
        }
    };

    return (
        // Your JSX code here
        <></>
    );
};

export default YourComponent;


