
import { UserModel } from './user.mongo.model.js';
import { UserRepo } from './user.mongo.repository.js';

describe('Given the UserRepo class', () => {
  describe('When it has been instantiate', () => {
    const repo = new UserRepo();

    test('Then the method post should be used', async () => {
      const mockUser = {
        id: '1',
        userName: 'silvia',
        email: 's@s.com',
        passwd: 'abcd',
        friends: [],
        enemies: []
      };
      UserModel.create = jest.fn().mockReturnValueOnce(mockUser);
      const result = await repo.create(mockUser);
      expect(UserModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    test('Then UserModel.search should have been called', async () => {
      const mockData = { key: '', value: '' };
      const exec = jest.fn().mockResolvedValue([]);
      UserModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.search(mockData);
      expect(UserModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
