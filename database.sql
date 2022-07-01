CREATE TABLE things_to_do (
	id SERIAL PRIMARY KEY,
	task character varying(500) NOT NULL,
	due date,
	"completion" boolean DEFAULT false,
);

INSERT INTO "things_to_do" 
	("task", "due", "completion") 
VALUES

SELECT * FROM weekend_to_do_app;