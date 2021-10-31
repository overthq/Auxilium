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

func fetchNearbyEmergencies(w http.ResponseWriter, r *http.Request) {

}

func handleRequests() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/emergencies", fetchNearbyEmergencies)
    log.Fatal(http.ListenAndServe(":4000", nil))
}

func main() {
	fmt.Println("Do something")
	handleRequests()
}

