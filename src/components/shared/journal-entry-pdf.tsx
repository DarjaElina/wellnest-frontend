import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
  const renderHTML = (html: string) => {
    const lines = html
      .replace(/<\/(h1|h2|p|ul|li)>/g, "\n")
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "_$1_")
      .replace(/<li>(.*?)<\/li>/g, "• $1")
      .replace(/<[^>]+>/g, "")
      .split("\n")
      .filter((line) => line.trim() !== "");

    return lines.map((line, idx) => (
      <Text key={idx} style={styles.paragraph}>
        {line}
      </Text>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.italic}>Date: {date}</Text>
        <View style={{ marginTop: 20 }}>{renderHTML(content)}</View>
      </Page>
    </Document>
  );
}
