// app/styles/VinSearch.styles.ts

import { StyleSheet } from 'react-native';
const main_styles = StyleSheet.create({
    logoTitle: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e7e5e4', // #e7e5e4 is the warmGray200 settingin gluestack-ui-->default tokens
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 15,
        alignSelf: "center",
        width: 375,
        maxWidth: "100%",

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
    input: {
        height: 40,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchButton: {
        marginTop: 10,
        height: 40,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    resultsContainer: {
        marginTop: 20,
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
    },
    title: {
        color: 'white',
        fontSize: 24,
    },
    box: {
        justifyContent: "center",
        alignItems: "center",
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
    },
    resultText: {
        marginTop: 20,
        fontSize: 18,
    },

});

export default main_styles;