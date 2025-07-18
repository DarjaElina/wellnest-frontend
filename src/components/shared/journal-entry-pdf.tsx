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

function parseHtmlToElements(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function renderNode(node: ChildNode): React.ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const el = node as Element;

    switch (el.tagName.toLowerCase()) {
      case "p":
        return (
          <Text key={Math.random()} style={styles.paragraph}>
            {Array.from(el.childNodes).map(renderNode)}
          </Text>
        );
      case "strong":
        return (
          <Text key={Math.random()} style={styles.bold}>
            {Array.from(el.childNodes).map(renderNode)}
          </Text>
        );
      case "em":
        return (
          <Text key={Math.random()} style={styles.italic}>
            {Array.from(el.childNodes).map(renderNode)}
          </Text>
        );
      case "ul":
        return (
          <View key={Math.random()} style={styles.list}>
            {Array.from(el.children).map(renderNode)}
          </View>
        );
      case "li":
        return (
          <View key={Math.random()} style={styles.listItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.listItemContent}>
              {Array.from(el.childNodes).map(renderNode)}
            </Text>
          </View>
        );
      case "h1":
        return (
          <Text key={Math.random()} style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
            {Array.from(el.childNodes).map(renderNode)}
          </Text>
        );
      case "h2":
        return (
          <Text key={Math.random()} style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
            {Array.from(el.childNodes).map(renderNode)}
          </Text>
        );
      default:
        return Array.from(el.childNodes).map(renderNode);
    }
  }

  return Array.from(doc.body.childNodes).map(renderNode);
}

export function JournalEntryPdf({
  title = "Journal Entry",
  date,
  content,
}: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.italic}>Date: {date}</Text>
        <View style={{ marginTop: 20 }}>{parseHtmlToElements(content)}</View>
      </Page>
    </Document>
  );
}
