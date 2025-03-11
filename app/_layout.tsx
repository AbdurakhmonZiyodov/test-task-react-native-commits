/* eslint-disable react-hooks/exhaustive-deps */
import { getAllFonts } from '@/assets/fonts';
import useComments from '@/hooks/useComments';
import useUsers from '@/hooks/useUsers';
import { userStore } from '@/store/user.store';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

async function initializeDB(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode=WAL;

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        message TEXT NOT NULL,
        parent_id INTEGER,  -- If this is a reply, points to the parent comment
        timestamp DATETIME DEFAULT (datetime('now', 'localtime')),  -- Storing local time instead of UTC
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

const RootLayout = observer(() => {
  const [loaded, error] = useFonts({
    ...getAllFonts(),
  });
  const { fetchUsersHandler } = useUsers();
  const { fetchAllCommentsHandler } = useComments();
  const { isLogged, initCurrentUser } = userStore;

  const navigateToMainScreen = useCallback(() => {
    router.replace('/main');
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    initCurrentUser();
    fetchUsersHandler();
    fetchAllCommentsHandler();
  }, []);

  useEffect(() => {
    if (isLogged) {
      navigateToMainScreen();
    }
  }, [isLogged]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'index'} />
      <Stack.Screen name={'login'} />
      <Stack.Screen name={'main'} />
      <Stack.Screen name={'+not-found'} />
    </Stack>
  );
});

export default function App() {
  return (
    <SQLiteProvider databaseName={'app.db'} onInit={initializeDB}>
      <RootLayout />
    </SQLiteProvider>
  );
}
