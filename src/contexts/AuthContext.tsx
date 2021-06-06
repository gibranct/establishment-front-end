import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from 'react';
import apiAuth from '../services/Api';

interface AuthContextData {
  isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  username: string;
}

interface AuthState {
  token: string;
  username: string;
  isAuthenticated: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
}

const TOKEN_KEY = '@Backend:token';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      apiAuth.defaults.headers.authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const [data, setData] = useState(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      const [, payload] = token.split('.');
      const { userName } = JSON.parse(atob(payload));
      return { isAuthenticated: !!token, username: userName };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await apiAuth.post('login', {
      email,
      password
    });

    const { jwtToken } = response.data;

    localStorage.setItem(TOKEN_KEY, jwtToken);

    const [, payload] = jwtToken.split('.');
    const { userName } = JSON.parse(atob(payload));
    setData({ token: jwtToken, isAuthenticated: true, username: userName });

    return jwtToken;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setData({} as AuthState);
  }, []);

  if (loading) return <h2>Carregando...</h2>;

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated: data.isAuthenticated,
        username: data.username
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro do AuthProvider');
  }
  return context;
}
