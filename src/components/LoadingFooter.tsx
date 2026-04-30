import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

const LoadingFooter = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={styles.text}>Loading more...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
  },
});

export default LoadingFooter;