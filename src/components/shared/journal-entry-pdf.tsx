import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Html from "react-pdf-html";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: 10,
  },
  italic: {
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "bold",
  },
  list: {
    marginBottom: 10,
    paddingLeft: 15,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    width: 10,
  },
  listItemContent: {
    flex: 1,
  },
});

type Props = {
  title?: string;
  date: string;
  content: string;
};

export function JournalEntryPdf({
  title = "Journal Entry",
  date,
  content,
}: Props) {
  if (!title || !content || !date) return <Document />;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.italic}>Date: {date}</Text>
        <View style={{ marginTop: 20 }}>
          <Html>{content}</Html>
        </View>
      </Page>
    </Document>
  );
}
