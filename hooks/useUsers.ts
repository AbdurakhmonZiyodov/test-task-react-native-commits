import { useCallback } from 'react';
import useDB from './useDB';
import { userStore } from '@/store/user.store';
import { User, UserParamsType } from '@/@types';
import useVisibility from './useVisibility';
import RN from '@/components/RN';
import { find, last } from 'lodash';

const useUsers = () => {
  const { fetchUsers, createUser, loginUser } = useDB();
  const loadingOfCreateUser = useVisibility();
  const loadingOfFetchUsers = useVisibility();
  const loadingOfLoginUser = useVisibility();

  const fetchUsersHandler = useCallback(async () => {
    loadingOfFetchUsers.show();
    try {
      const users = await fetchUsers();
      userStore.setUsers(users as User[]);
    } catch (err) {
      console.error(err);
    } finally {
      loadingOfFetchUsers.hide();
    }
  }, [fetchUsers, loadingOfFetchUsers]);

  const createUserHandler = useCallback(
    async (user: UserParamsType, callback?: () => void) => {
      loadingOfCreateUser.show();
      try {
        const isCreated = await createUser(user);
        if (isCreated) {
          const lastUser = last(userStore.users);
          const newId = lastUser ? lastUser.id + 1 : 1;
          const newUser = { ...user, id: newId } as User;

          userStore.addUser(newUser);
          userStore.setCurrentUser(newUser);
          RN.Alert.alert('Success!', 'User created successfully');
          callback && callback();
        }
      } catch (err: any) {
        RN.Alert.alert('Ops!', err.message);
        console.error(err);
      } finally {
        loadingOfCreateUser.hide();
      }
    },
    [createUser, loadingOfCreateUser],
  );

  const loginUserHandler = useCallback(
    async (email: string, callback?: () => void) => {
      loadingOfLoginUser.show();
      try {
        const isSuccess = await loginUser(email);
        if (isSuccess) {
          RN.Alert.alert('Success!', 'User logged in successfully');
          callback && callback();

          const currentUser = find(userStore.users, { email });
          if (currentUser) {
            userStore.setCurrentUser(currentUser);
          }
        }
      } catch (err: any) {
        RN.Alert.alert('Ops!', err.message);
        console.error(err);
      } finally {
        loadingOfLoginUser.hide();
      }
    },
    [loadingOfLoginUser, loginUser],
  );

  return {
    fetchUsersHandler,
    createUserHandler,
    loginUserHandler,
    isLoadingOfCreateUser: loadingOfCreateUser.visible,
    isLoadingOfFetchUsers: loadingOfFetchUsers.visible,
    isLoadingOfLoginUser: loadingOfLoginUser.visible,
  };
};

export default useUsers;
