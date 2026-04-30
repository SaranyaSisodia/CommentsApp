import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, fontSize, borderRadius } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CommentDetail'>;

const CommentDetailScreen = ({ route }: Props) => {
  const { comment } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{comment.name}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.emailValue}>{comment.email}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Post ID</Text>
          <Text style={styles.value}>#{comment.postId}</Text>
        </View>
      </View>

      <View style={styles.bodyCard}>
        <Text style={styles.label}>Comment</Text>
        <Text style={styles.bodyText}>{comment.body}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  row: {
    padding: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: fontSize.lg,
    color: colors.text.primary,
    fontWeight: '500',
  },
  emailValue: {
    fontSize: fontSize.lg,
    color: colors.primary,
    fontWeight: '500',
  },
  bodyCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bodyText: {
    fontSize: fontSize.md,
    color: colors.text.body,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
});

export default CommentDetailScreen;