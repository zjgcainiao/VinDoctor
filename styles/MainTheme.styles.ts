// app/styles/VinSearch.styles.ts

import { StyleSheet } from 'react-native';

const main_styles = StyleSheet.create({

      tabsContainerStyle: {
    borderColor: 'black',
  },
  tabStyle: {
    borderColor: 'black',
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: 'black',
  },
  tabTextStyle: {
    color: 'black',
  },
  activeTabTextStyle: {
    color: 'white',
  },
    box: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d4af37", // gold box
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: "90%", // responsive width
        maxWidth: 200, // maximum width
    },
    card: {
        flex: 1,
        backgroundColor: 'white', // gold metallic gradient background
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        padding: 16,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 2 },
        elevation: 3,
        maxHeight: 200,
    },
    container: {
        flex: 1,
        justifyContent: "center", // center vertically
        alignItems: "center", // center horizontally
        margin:20,
        padding: 20, // Adjust padding as needed
        //backgroundColor: '#e7e5e4', //'#1c1c1c'-- dark gray background.  '#e7e5e4' is the warmGray200 settingin gluestack-ui-->default tokens
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        borderBlockColor: "gray",
        alignSelf: "center",
        width: "95%", // responsive width
        maxWidth: 1200, // maximum width
        // minHeight:200,
    },
      description: {
        fontSize: 18,
        marginBottom: 20,
        color: "#ddd", // light gray text
        textAlign: "center", // center text
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff", // white text
        textAlign: "center", // center text
    },

    input: {
        flex:1,
        flexDirection: "column",   
        borderColor: '#888', //#888 is gr   ay
        padding: 10,
        borderWidth: 2,
        marginVertical: 8,
        borderRadius: 5,
        paddingHorizontal: 20,
        backgroundColor: "#fff", // white background
        marginBottom: 20,
        justifyContent: "center",
        width: "90%", // responsive width
        // maxWidth: 500, // maximum width
    },

    searchButton: {
        marginTop: 10,
        height: 40,
        backgroundColor: '#c0c0c0', // silver button. Backup color: '#007BFF'- blue button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: "90%", // responsive width
        maxWidth: 200, // maximum width
    },

    resultsContainer: {
        flex:1,
        marginTop: 20,
        width: "95%", // responsive width
        minWidth: 200, // minimum width
        maxWidth: 600, // maximum width
    },
    resultItem: {
        padding: 10,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
    },
    vinText: {
        fontSize: 16,
        fontFamily: "Exo2-Bold",
        color: "#333333", // darker silver metallic color
        marginTop: 10, // Add marginTop property
    },
    
    title: {
        color: 'white',
        fontSize: 24,
    },

    tabContent: {
        flex:1,
        marginTop: 50,
        marginBottom: 20,
        // Additional styles for tab content
    },

    searchInput: {
        flex: 3,
        alignItems: 'stretch',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 5,
        marginBottom: 10,
        width: "100%", // responsive width
        maxWidth: 50, // maximum width
    },

    resultText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "NotoSansMono-Regular",
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
        fontFamily: "NotoSansMono-Medium",
        letterSpacing: 0.25,
    },

    backButton: {
        alignSelf: 'flex-start', // Align the back button to the left
        marginBottom: 20, // Add some space below the back button
    },
    //darker grey button
    mutedButton: {
        backgroundColor: "transparent", // "#e7e5e4" gray
        color: "#9a3412", // Muted text color #57534e warmgray600. #fb923c orange400. #1f2937 coolgray800. #9a3412, orange800.
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        fontFamily: "Exo2-Semibold",
    },
    mutedButtonText: {
        color: "#78716c", // #78716c warmgray400
        // letterSpacing: 1.5,
        fontFamily: "Exo2-Bold",
    },


});

export default main_styles;

