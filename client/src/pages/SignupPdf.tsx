import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
  },
});

// PDF Document Component
const SignupPdf = ({ formData }: { formData: any }) => {
  const name = "asmit";
  const email = "m@example.com";
  const userType = "user";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Signup Details</Text>
        </View>
        <View style={styles.section}>
          <Text>Name: {name}</Text>
        </View>
        <View style={styles.section}>
          <Text>Email: {email}</Text>
        </View>
        <View style={styles.section}>
          <Text>User Type: {userType}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default SignupPdf;
