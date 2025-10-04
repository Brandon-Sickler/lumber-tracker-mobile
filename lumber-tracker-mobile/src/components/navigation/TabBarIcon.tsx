/**
 * TAB BAR ICON COMPONENT - LUMBER TRACKER MOBILE APP (SDK 54)
 * 
 * Reusable icon component for tab bar navigation.
 * Provides consistent icon styling and sizing across the application.
 * 
 * Key Features:
 * - Consistent icon sizing (28px)
 * - Proper alignment with tab bar
 * - Support for all Ionicons
 * - Customizable styling
 * 
 * Usage:
 * - Used in tab navigation
 * - Supports all Ionicons from @expo/vector-icons
 * - Automatically handles alignment and sizing
 * 
 * Icon Reference: https://icons.expo.fyi/
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

/**
 * TabBarIcon component
 * Renders an icon for use in tab bar navigation
 * @param style - Additional styles to apply to the icon
 * @param rest - All other props passed to the Ionicons component
 * @returns JSX element with properly styled icon
 */
export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <Ionicons 
      size={28}                                    // Standard icon size for tab bar
      style={[{ marginBottom: -3 }, style]}        // Adjust alignment and apply custom styles
      {...rest}                                    // Pass through all other props
    />
  );
}
