interface User {
  id: string;
  name: string;
}

const users: User[] = [];

export function createUser(name: string): User {
  const user: User = {
    id: crypto.randomUUID(),
    name,
  };

  users.push(user);
  return user;
}

export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) ?? null;
}
