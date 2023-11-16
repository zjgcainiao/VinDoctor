// app/styles/VinSearch.styles.ts

import { StyleSheet } from 'react-native';

const main_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e7e5e4', //'#1c1c1c'-- dark gray background.  '#e7e5e4' is the warmGray200 settingin gluestack-ui-->default tokens
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 15,
        alignSelf: "center",
        width: "90%", // responsive width
        maxWidth: 500, // maximum width
        justifyContent: "center", // center vertically
        alignItems: "center", // center horizontally
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff", // white text
        textAlign: "center", // center text
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
        color: "#ddd", // light gray text
        textAlign: "center", // center text
    },
    input: {
        height: 40,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff", // white background
        marginBottom: 10,
        width: "100%", // responsive width
        maxWidth: 500, // maximum width
    },
    searchButton: {
        marginTop: 10,
        height: 40,
        backgroundColor: '#c0c0c0', // silver button. Backup color: '#007BFF'- blue button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: "100%", // responsive width
        maxWidth: 500, // maximum width
    },
    buttonText: {
        color: '#000', // black text. '#FFF' white text
        fontWeight: 'bold',
    },
    resultsContainer: {
        marginTop: 20,
        width: "100%", // responsive width
        maxWidth: 500, // maximum width
    },
    resultItem: {
        padding: 10,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
    },
    vinText: {
        fontSize: 16,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#333',
        width: "100%", // responsive width
        maxWidth: 500, // maximum width
    },
    title: {
        color: 'white',
        fontSize: 24,
    },
    box: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d4af37", // gold box
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: "90%", // responsive width
        maxWidth: 500, // maximum width
    },
    searchInput: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff", // white background
        marginBottom: 10,
        width: "100%", // responsive width
        maxWidth: 500, // maximum width
    },

    resultText: {
        marginTop: 20,
        fontSize: 18,
        color: "#fff", // white text
        textAlign: "center", // center text
    },


    timings: {
        color: "#fff",
        fontSize: 14,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#333',
    },
    headerText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    searchContainer: {
        marginTop: 20,
        marginBottom: 10,
    },

});

export default main_styles;

