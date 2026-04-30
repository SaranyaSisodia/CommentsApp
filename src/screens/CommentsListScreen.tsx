import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Comment } from '../api/comments';
import useComments from '../hooks/useComments';
import CommentCard from '../components/CommentCard';
import LoadingFooter from '../components/LoadingFooter';
import ErrorView from '../components/ErrorView';
import { colors, spacing, fontSize } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CommentsList'>;

const CommentsListScreen = ({ navigation }: Props) => {
  const {
    comments,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    retry,
  } = useComments();

  const handlePress = useCallback(
    (comment: Comment) => {
      navigation.navigate('CommentDetail', { comment });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Comment }) => (
      <CommentCard item={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const keyExtractor = useCallback(
    (item: Comment) => item.id.toString(),
    [],
  );

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading comments...</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorView message={error} onRetry={retry} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoadingMore ? <LoadingFooter /> : null}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No comments found</Text>
          </View>
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
});

export default CommentsListScreen;