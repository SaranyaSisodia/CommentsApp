import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Comment } from '../api/comments';
import { colors, spacing, fontSize, borderRadius } from '../theme';

interface Props {
  item: Comment;
  onPress: (comment: Comment) => void;
}

const CommentCard = memo(({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
      <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: fontSize.md,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: fontSize.md,
    color: colors.text.body,
    lineHeight: 20,
  },
});

export default CommentCard;