import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TextBoxProps {
  label: string;
  value: string;
  isLoading?: boolean;
}

function TextBox({label, value, isLoading}: TextBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        {isLoading ? (
          <Text style={styles.value}>Translating now, Please wait...</Text>
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </View>
  );
}

export {TextBox};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  box: {
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e8e8e8',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    minHeight: 157,
    overflow: 'scroll',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
});

// .label {
//   font-size: 12;
//   font-weight: 400;
//   color: #666666;
// }

// .textContainer {
//   background-color: #f6f6f6;
//   border-width: 1;
//   border-style: solid;
//   border-color: #e8e8e8;
//   border-radius: 16px;
//   outline: none;
//   padding: 40px 32px;
//   font-size: 16px;
//   font-weight: 500;
//   height: 157;
//   margin: 0;
// }
