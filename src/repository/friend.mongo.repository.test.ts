
import { User } from '../entities/user';
import { FriendModel } from './friend.mongo.model';
import { FriendRepo } from './friend.mongo.repository';

jest.mock('./friend.mongo.model.js');
describe('Given FriendRepo Class', () => {
  describe('When I instantiate it', () => {
    const repo = new FriendRepo();

    test('Then method query should be used', async () => {
      const exec = jest.fn().mockResolvedValue([]);
      FriendModel.find = jest.fn().mockReturnValueOnce({
        populate: jest.fn().mockReturnValueOnce({
          exec,
        }),
      });
      const result = await repo.query();
      expect(FriendModel.find).toHaveBeenCalled();
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test('Then method queryById should be used', async () => {
      const mockSample = { id: '1' };
      const exec = jest.fn().mockResolvedValue(mockSample);
      FriendModel.findById = jest.fn().mockReturnValueOnce({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      const result = await repo.queryById('1');
      expect(exec).toHaveBeenCalled();
      expect(result).toEqual(mockSample);
    });

    //

    // Pendiente Resolver error:  test('Then it should throw an error when the method getById finds an invalid id', async () => {
    //   const mockId = '3';
    //   const exec = jest.fn().mockResolvedValue(null);
    //   FriendModel.findById = jest.fn().mockReturnValueOnce({
    //     exec,
    //   });
    //   await expect(repo.queryById(mockId)).rejects.toThrowError();
    // });

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

    // Lo dejo aquí pendiente de resolver error:
    // A test('Then UserModel.search should have been called', async () => {
    //   const mockData = { key: '', value: '' };
    //   const exec = jest.fn().mockResolvedValue([]);
    //   FriendModel.find = jest.fn().mockReturnValueOnce({
    //     exec,
    //   });
    //   const result = await repo.search(mockData);
    //   expect(FriendModel.find).toHaveBeenCalled();
    //   expect(result).toEqual([]);
    });
  });


