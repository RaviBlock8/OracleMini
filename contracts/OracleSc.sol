pragma solidity ^0.6.0;

contract OracleSc {
    event WeatherUpdate(string temperature);
    address public oracleAddress;

    constructor(address _oracleAddress) public {
        oracleAddress = _oracleAddress;
    }

    function updateWeather(string memory temperature) public {
        require(msg.sender == oracleAddress, "Not from whitelist address");
        emit WeatherUpdate(temperature);
    }
}
