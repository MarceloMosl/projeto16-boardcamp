SELECT json_build_object(
    'id', rentals.id,
    'customerId', rentals."customerId",
    'gameId', rentals."gameId",
    'rentDate', rentals."rentDate",
    'daysRented', rentals."daysRented",
    'returnDate', rentals."returnDate",
    'originalPrice', rentals."originalPrice",
    'delayFee', rentals."delayFee",
    'customers', json_build_object(
        'id', customers.id,
        'name', customers.name
    ),
    'games', json_build_object(
        'id', games.id,
        'name', games.name
    )) FROM rentals JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id;


    SELECT rentals.*, games.id, games.name, customers.id, customers.name
      FROM rentals
      JOIN games
      ON games.id = rentals."gameId"
      JOIN customers
      ON customers.id = rentals."customerId";