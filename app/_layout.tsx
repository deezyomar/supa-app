import { supabase } from '@/utils/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Session } from '@supabase/supabase-js';
import { useFonts } from 'expo-font';
import { useSegments, useRouter, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import {useAnimatedStyle, useSharedValue, withSequence, withTiming, withRepeat} from 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';



const InitialLayout = () => {
const [session, setSettion] = useState<Session | null>(null);
const [initialized, setInitialized ] = useState(false);

const segments = useSegments();
const router = useRouter();



  useEffect(() => {
    const {data} = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('supabase.auth.onAuthStateChange', event, session)
      setSettion(session);
      setInitialized(true);
    });
  
    return () => {
      data.subscription.unsubscribe();
    }
  }, [])

  useEffect(() => {
    if (!initialized) return;
    
    const inAuthGroup = segments[0] === '(auth)';

    if (session && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (!session) {
      router.replace('/');
    }
  }, [initialized, session]);

  return <Slot />;
};

  

export default InitialLayout
