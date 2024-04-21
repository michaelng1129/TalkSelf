import { open } from 'react-native-quick-sqlite';
import axios from 'axios';
import * as RNFS from '@dr.pogodin/react-native-fs';;

const mountDatabase = async () => {
    try {
        const isFileExists = await RNFS.exists(RNFS.DocumentDirectoryPath + '/EngDB.sqlite');

        if (!isFileExists) {
            const response = await axios.get('http://192.168.1.2:8000/download');
            const jsonData = response.data;

            const db = open({ name: 'EngDB.sqlite' });

            db.execute('CREATE TABLE IF NOT EXISTS words (word TEXT, pos TEXT, def TEXT);');
            console.log('Table "words" created');

            db.transaction((tx) => {
                for (const { word, pos, def } of jsonData) {
                    tx.executeAsync('INSERT INTO words (word, pos, def) VALUES (?, ?, ?);', [word, pos, def]);
                    console.log(`Insert: ${word}, ${pos}, ${def}`);
                }
            });

            db.execute('CREATE INDEX IF NOT EXISTS idx_word ON words (word);');
            console.log('Index "idx_word" created');

            console.log('Database mounted successfully');
            return true;
        } else {
            console.log('EngDB.sqlite file already exists. Skipping download and import.');
        }
        return true;
    } catch (error: any) {
        console.error('Error mounting database:', error.message);
    }
};

export default mountDatabase;


