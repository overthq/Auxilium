package main

import (
	"fmt"
	"log"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello world")
	fmt.Println("Do thing")
}

func createEmergency(w http.ResponseWriter, r *http.Request) {

}

func fetchNearbyEmergencies(w http.ResponseWriter, r *http.Request) {

}

func handleRequests() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/emergencies", fetchNearbyEmergencies)
    http.HandleFunc("/emergencies/new", createEmergency)
    log.Fatal(http.ListenAndServe(":4000", nil))

    fmt.Println("Server running on port 4000")
}

func main() {
	handleRequests()
}

