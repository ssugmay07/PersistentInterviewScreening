const {Builder, By, until, WebDriver} = require("selenium-webdriver");

const assert = require('assert');

const driver = new Builder().forBrowser("firefox").build();

async function astraTestcase() {

    try{
        
       // Launching the URL
        await (await driver).get("http://astra.datastax.com/");

        //Entering the username
        await (await driver).findElement(By.id("username")).sendKeys("ssuganya.nirmal@gmail.com");
        
        //Entering the password
        await (await driver).findElement(By.id("password")).sendKeys("Astra_sep30");
       
        //Clicking on Login Button
        await (await (await driver).findElement(By.id("kc-login"))).click();


        //Adding a database
        await (await (await driver).
        wait(until.elementLocated(By.xpath(`//div[@class="dashboard"]/div[1]/div[1]/div[2]/a`)),3000)).click();
        
        //Selecting a free fare database
        await (await (await driver).wait(until.elementLocated(By.
        xpath(`//div[@class="row mb-4"]/div/div[1]`)),3000)).click();
        
        //Selecting the state
        await (await (await driver).wait(until.elementLocated(By.
            xpath(`//div[@class="col-lg-9"]/div/div/div[3]/div/div`)),3000)).click();

         //Clicking on the configure button to create a DB
         await (await (await driver).wait(until.elementLocated(By.
                xpath(`//div[@class="text-right"]/button`)),3000)).click();

        //Entering the Database details
         await (await driver).findElement(By.name("name")).sendKeys("TestDB");

         await (await driver).findElement(By.name("keyspace")).sendKeys("Key1");

         await (await driver).findElement(By.name("username")).sendKeys("TestDBun1");

         await (await driver).findElement(By.name("password")).sendKeys("TestDBpwd123");

         await (await driver).findElement(By.name("confirmation")).sendKeys("TestDBpwd123");

         await (await (await driver).findElement(By.xpath("//button[contains(text(),'Create Database')]"))).click();

         
         //Identifying the DB status
         var status=await (await (await driver).wait(until.elementLocated(By.
            xpath(`//div[@class="row my-1"]/div[1]/div/strong/span`)),3000)).getText();
        
        //Wait until status changes to Active
         while(status.includes("Pending")){
            status=await (await (await driver).wait(until.elementLocated(By.
                xpath(`//div[@class="row my-1"]/div[1]/div/strong/span`)),3000)).getText();
        }
        
        //Verifying the Active status and print
        if(status.includes("Active")) {
            console.log("TESTCASE PASSED");
        }
        else
            console.log("TESTCASE FAILED");

        assert.deepStrictEqual(status,"Active");
        
        //Click on the dropdown   
        await (await (await driver).findElement(By.xpath(`//div[@class="card__actions text-right"]/div/button`))).click();    
       
        //click on terminate
        await (await (await driver).wait(until.elementLocated(By.
            xpath(`//div[@class="dropdown-menu dropdown-menu-right show"]/button`)),3000)).click();
        
        //add the DB to be deleted
        await (await (await driver).wait(until.elementLocated(By.
                xpath(`//div[@class="form-group"]/input`)),3000)).sendKeys("TestDB");  

        //   click on terminate DB
        await (await (await driver).wait(until.elementLocated(By.
                    xpath(`//div[@class="modal__footer"]/button[2]`)),3000)).click();


           
    }
    catch(error){

        console.log(error);
    }

}
astraTestcase();
