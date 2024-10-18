const mysql = require('mysql2/promise');

const dbConnection = async () => {
  return await mysql.createConnection({
    host: 'campaign-markdb01.cr2ceugwq8m6.us-east-2.rds.amazonaws.com',
    user: 'admin017',
    password: 'adp4$worDrd5',
    database: 'campaignDB',
  });
};

module.exports.createCampaign = async (event) => {
  const { name, process_date, process_hour, phone_list, message_text } = JSON.parse(event.body);

  const connection = await dbConnection();
  const [result] = await connection.execute(
    'INSERT INTO campaigns (user_id, name, process_date, process_hour, process_status, phone_list, message_text) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [1, name, process_date, process_hour, 0, phone_list, message_text]
  );
  
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Campaign created', id: result.insertId }),
  };
};


module.exports.hello = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Hello, Serverless Framework!',
          input: event,
        },
        null,
        2
      ),
    };
  };


module.exports.listCampaigns = async (event) => {
  try {
    // Obtener los parámetros de la consulta (query parameters)
    const { start_date, end_date } = event.queryStringParameters || {};

    const connection = await dbConnection();

    let query = 'SELECT * FROM campaigns';
    let queryParams = [];

    if (start_date && end_date) {
      query += ' WHERE process_date BETWEEN ? AND ?';
      queryParams.push(start_date, end_date);
    } else {

      query += ' LIMIT 10';
    }

    const [rows] = await connection.execute(query, queryParams);

    await connection.end();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: 'List of campaigns',
        data: rows,
      }),
    };
  } catch (error) {
    console.error('Error fetching campaigns:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error fetching campaigns',
        error: error.message,
      }),
    };
  }
};


module.exports.getMessages = async (event) => {
    const { id } = event.pathParameters;
  
    try {
      const connection = await dbConnection();
  
      const [messages] = await connection.execute(
        'SELECT id, phone, text, shipping_status, process_date, process_hour FROM messages WHERE campaign_id = ?',
        [id]
      );
  
      if (messages.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'No messages found for this campaign' }),
        };
      }
  
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(messages),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'An error occurred while fetching messages' }),
      };
    }
};

module.exports.sendCampaign = async (event) => {
    const { id } = event.pathParameters;
  
    try {
      const connection = await dbConnection();
  
      const [campaign] = await connection.execute(
        'SELECT id, name, process_date, process_hour, phone_list, message_text, process_status FROM campaigns WHERE id = ?',
        [id]
      );
  
      if (campaign.length === 0) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Campaign not found' }),
        };
      }
  
      const campaignData = campaign[0];
  
      const phoneNumbers = campaignData.phone_list.split(',').map((phone) => phone.trim());
  
      phoneNumbers.forEach((phone) => {
        console.log(`Sending message "${campaignData.message_text}" to ${phone}`);
      });
  
      await connection.execute(
        'UPDATE campaigns SET process_status = 1 WHERE id = ?',
        [id]
      );
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Campaign sending process started',
          campaignId: id,
          sentTo: phoneNumbers,
        }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'An error occurred while sending the campaign' }),
      };
    }
};