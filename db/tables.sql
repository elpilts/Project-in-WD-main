CREATE TABLE "Εθελοντής" (
	"Ονοματεπώνυμο"	TEXT NOT NULL,
	"Email"	TEXT NOT NULL UNIQUE,
	"Κινητό"	INTEGER,
	"Ηλικία"	INTEGER,
	PRIMARY KEY("Email")
)

CREATE TABLE "Εκδήλωση" (
	"Όνομα"	TEXT NOT NULL UNIQUE,
	"Τοποθεσία"	TEXT,
	"Ημερομηνία"	TEXT,
	PRIMARY KEY("Όνομα")
)

CREATE TABLE "Πανεπιστήμιο" (
	"Τοποθεσία"	TEXT NOT NULL UNIQUE,
	"Τμήμα"	TEXT,
	PRIMARY KEY("Τοποθεσία")
)

CREATE TABLE "Σπουδάζει" (
	"email_εθελοντή"	TEXT NOT NULL,
	"τοποθεσία_πανεπιστημίου"	TEXT NOT NULL,
	FOREIGN KEY("email_εθελοντή") REFERENCES "Εθελοντής"("Email"),
	FOREIGN KEY("τοποθεσία_πανεπιστημίου") REFERENCES "Πανεπιστήμιο"("Τοποθεσία")
)

CREATE TABLE "Συμμετέχει" (
	"email_εθελοντή"	TEXT NOT NULL,
	"Όνομα_εκδήλωσης"	TEXT NOT NULL,
	FOREIGN KEY("Όνομα_εκδήλωσης") REFERENCES "Εκδήλωση"("Όνομα"),
	FOREIGN KEY("email_εθελοντή") REFERENCES "Εθελοντής"("Email")
)