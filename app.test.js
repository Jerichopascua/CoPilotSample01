const request = require('supertest');
const app = require('./app');

describe('GET /api/negeri', () => {
  it('should return the JSON data from the "negeri.json" file', async () => {
    const response = await request(app).get('/api/negeri');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should return an error message if there is an error reading the file', async () => {
    const readFileMock = jest.spyOn(fs, 'readFile');
    readFileMock.mockImplementation((path, encoding, callback) => {
      callback(new Error('An error occurred while reading the file'));
    });

    const response = await request(app).get('/api/negeri');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'An error occurred while reading the file' });

    readFileMock.mockRestore();
  });
});

describe('POST /api/negeri', () => {
  it('should add a new state to the JSON data array and save the file', async () => {
    const response = await request(app)
      .post('/api/negeri')
      .send({ name: 'New State' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'State added successfully' });
  });

  it('should return an error message if there is an error reading or writing the file', async () => {
    const readFileMock = jest.spyOn(fs, 'readFile');
    readFileMock.mockImplementation((path, encoding, callback) => {
      callback(new Error('An error occurred while reading the file'));
    });

    const response = await request(app)
      .post('/api/negeri')
      .send({ name: 'New State' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'An error occurred while reading the file' });

    readFileMock.mockRestore();
  });
});