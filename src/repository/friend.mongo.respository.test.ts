
import { User } from '../entities/user';
import { FriendModel } from './friend.mongo.model';
import { FriendRepo } from './friend.mongo.repository';

describe('Given the FriendRepo class', () => {
  describe('When it has been instantiate', () => {
    const repo = new FriendRepo();
    test('Then the method getAll should be used', async () => {
      const exec = jest.fn().mockResolvedValue([]);
      FriendModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.query();
      expect(FriendModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then the method getById should be used', async () => {
      const mockId = '2';
      const mockFriend = { id: '2', userName: '' };
      const exec = jest.fn().mockResolvedValue(mockFriend);
      FriendModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.queryById(mockId);
      expect(FriendModel.findById).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual(mockFriend);
    });

    test('Then it should throw an error when the method getById finds an invalid id', async () => {
      const mockId = '3';
      const exec = jest.fn().mockResolvedValue(null);
      FriendModel.findById = jest.fn().mockReturnValueOnce({
        exec,
      });
      await expect(repo.queryById(mockId)).rejects.toThrowError();
    });

    test('Then the method post should be used', async () => {
      const mockFriend = {
        userName: 'pepito',
        friendUser: {} as User,
      };

      FriendModel.create = jest.fn().mockReturnValueOnce(mockFriend);
      const result = await repo.create(mockFriend);
      expect(FriendModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockFriend);
    });

    test('Then the method delete should be called', async () => {
      const mockId = '6';
      const exec = jest.fn();
      FriendModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });
      await repo.delete(mockId);
      expect(FriendModel.findByIdAndDelete).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
    });

    test('Then it should throw an error when the delete method doesn`t find a valid id', async () => {
      const mockId = '9';
      const exec = jest.fn().mockResolvedValue(null);
      FriendModel.findByIdAndDelete = jest.fn().mockReturnValueOnce({
        exec,
      });
      await expect(repo.delete(mockId)).rejects.toThrow();
    });

    test('Then UserModel.search should have been called', async () => {
      const mockData = { key: '', value: '' };
      const exec = jest.fn().mockResolvedValue([]);
      FriendModel.find = jest.fn().mockReturnValueOnce({
        exec,
      });
      const result = await repo.search(mockData);
      expect(FriendModel.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
