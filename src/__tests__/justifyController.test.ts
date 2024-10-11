import request from 'supertest';
import generateToken from '@/utils/generateToken';
import { app, server } from '@/index';
import fs, { readFile } from 'fs';
import path from 'path';

describe('POST /api/justify', () => {

  let token: string;

  beforeAll(() => {
    token = generateToken('foo@bar.com');
  });

  afterAll((done) => {
    server.close(done);
  });

  const readFile = (fileName: string) => {
    return fs.readFileSync(path.join(__dirname, fileName), 'utf-8').trim();
  };


  it('should return justified text', async () => {
    const inputText = readFile('./input1.txt');
    const expectedOutput = readFile('./expectedOutput1.txt');


    const response = await request(app)
      .post('/api/justify')
      .send(inputText)
      .set('Content-Type', 'text/plain')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.text).not.toContain('\n\n');
    expect(response.text).toBe(expectedOutput);
    expect(response.status).toBe(200);
  });

});