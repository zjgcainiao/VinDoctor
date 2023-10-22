// app/styles/VinSearch.styles.ts

import { StyleSheet } from 'react-native';

 const main_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009898',
        paddingHorizontal: 20,
        // width:"100%",
         
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
    
});

export default main_styles;