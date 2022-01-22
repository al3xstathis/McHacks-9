package main

func main() {
	r := setupRouter()
	r.Run(":80")
}
