DELIMITER $$

CREATE PROCEDURE show_logs()
BEGIN 
	SELECT requisicao, createdAt FROM schema.Logs;
END $$
DELIMITER ;

CALL show_logs ();
