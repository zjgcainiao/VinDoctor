// app/styles/VinSearch.styles.ts

import { StyleSheet } from 'react-native';

const main_styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //backgroundColor: '#e7e5e4', //'#1c1c1c'-- dark gray background.  '#e7e5e4' is the warmGray200 settingin gluestack-ui-->default tokens
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 5,
        alignSelf: "center",
        width: "95%", // responsive width
        maxWidth: 1200, // maximum width
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
        borderColor: '#888', //#888 is gray
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff", // white background
        marginBottom: 10,
        width: "80%", // responsive width
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
    logo: {
        width: 200, // Adjust as needed
        height: 150, // Adjust as needed
        resizeMode: "contain",
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "transparent", //'#333',
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
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 12,
        paddingHorizontal: 10,
        background: 'linear-gradient(90deg, #C0C0C0 0%, #C0C0C0 50%, #FFF 50%)', // silver metallic gradient background
        marginBottom: 10,
        width: "100%", // responsive width
        maxWidth: 500, // maximum width
    },

    resultText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "RobotoCondensed_family",
        color: "#000212", // white text
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
        marginBottom: 20,
    },

    button: {
        background: 'linear-gradient(160deg, #97989a, #d1d3d5, #555d61 100%)', // silver metallic-looking style using gradient. 
        // alternative: ["#97989a", "#d1d3d5", "#555d61"]
        padding: 10,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        elevation: 3,
        alignItems: "center",
        marginVertical: 10,
        fontFamily:"ShareTechMono-Regular",
    },

    buttonText: {
        color: '#000', // black text. '#FFF' white text
        fontWeight: 'bold',
        fontFamily: "RobotoCondensed",
        letterSpacing: 0.25,
    },

    backButton: {
        marginBottom: 10,
    },
    //darker grey button
    mutedButton: {
        backgroundColor: "transparent", // "#e7e5e4" gray
        color: "#fb923c", // Muted text color #57534e warmgray600. #fb923c orange400
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    mutedButtonText: {
        color: "#78716c", // #78716c warmgray400
        // letterSpacing: 1.5,
        fontFamily: "ShareTechMono-Regular",
    },
    tabContent: {
        flex:1,
        marginTop: 50,
        marginBottom: 20,
        // Additional styles for tab content
    },


});

export default main_styles;

