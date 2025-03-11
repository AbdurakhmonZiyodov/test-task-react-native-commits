import { User } from '@/@types';
import asyncStorageManager from '@/utils/async-storage';
import { filter, find, map } from 'lodash';
import { makeAutoObservable, runInAction } from 'mobx';

class UserStore {
  public users: User[] = [];
  public currentUser: User | null = null;
  public isLoadingOfFetchCurrentUser = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUsers = (users: User[]) => {
    this.users = users;
  };

  addUser = (user: User) => {
    this.users.push(user);
  };

  deleteUser = (id: number) => {
    this.users = filter(this.users, (u) => u.id !== id);
  };

  clearAllUsers = () => {
    this.users = [];
  };

  setCurrentUser = (user: User) => {
    this.currentUser = user;
    asyncStorageManager.setItem('currentUser', JSON.stringify(user));
  };

  findUserById = (id: number) => find(this.users, { id });

  clearCurrentUser = () => {
    this.currentUser = null;
    asyncStorageManager.removeItem('currentUser');
  };

  initCurrentUser = async () => {
    runInAction(() => {
      this.isLoadingOfFetchCurrentUser = true;
    });
    const user = await asyncStorageManager.getItem('currentUser');
    if (user) {
      runInAction(() => {
        this.currentUser = JSON.parse(user);
        this.isLoadingOfFetchCurrentUser = false;
      });
    }
  };

  updateUser = (user: User) => {
    this.users = map(this.users, (u) => (u.id === user.id ? user : u));
  };

  logout = () => {
    this.clearCurrentUser();
  };

  get isLogged() {
    return !!this.currentUser;
  }
}

export const userStore = new UserStore();
