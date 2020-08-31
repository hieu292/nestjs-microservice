export interface UserEntity {
  userId: number;
  token: string;
  name: string;
}

// TODO: implement me
export const login = async (username: string, password: string): Promise<UserEntity> => {
  return {
    userId: 1,
    token: '1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    name: 'User One',
  };
};
