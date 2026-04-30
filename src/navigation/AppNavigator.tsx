import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Comment } from '../api/comments';
import { colors } from '../theme';
import CommentsListScreen from '../screens/CommentsListScreen';
import CommentDetailScreen from '../screens/CommentDetailScreen';

export type RootStackParamList = {
  CommentsList: undefined;
  CommentDetail: { comment: Comment };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CommentsList"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="CommentsList"
          component={CommentsListScreen}
          options={{ title: 'Comments' }}
        />
        <Stack.Screen
          name="CommentDetail"
          component={CommentDetailScreen}
          options={({ route }) => ({
            title: route.params.comment.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;