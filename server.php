<?php
$_POST = json_decode(file_get_contents('php://input'), true); // все то что приходит от клиента декодируем в json
echo var_dump($_POST); // позволяет увидеть данные, которые приходят с клиента
// берет данные, которые пришли с клиента, превращает их в строку и показывает обратно на клиенте
// показывает как на php коде получить json данные и с ними поработать