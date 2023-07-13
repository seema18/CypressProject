describe('Test Contact App', () => {

  beforeEach(() => {
    cy.visit('./contact_app.html')
  })

  it('Test if the application loads correctly', () => {
    cy.get('h1.text-center').should('have.text', 'Contact List App');
    cy.get('table tbody tr').should('have.length', 1)
  })

  // Added Tests from Here
  it('Test if highlight the Name field on click', () => {
    cy.get(':nth-child(1) > .form-control').click().should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.screenshot('Test1')
  })

  it('Test if highlight the Number field on click', () => {
    cy.get(':nth-child(2) > .form-control').click().should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.screenshot('Test2')
  })

  it('Test if highlight the Email field on click', () => {
    cy.get(':nth-child(3) > .form-control').click().should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.screenshot('Test3')
  })
  it('Test if highlight the Add button on focus', () => {
    cy.get("button[name='add']").focus().should('have.css', 'background-color', 'rgb(0, 123, 255)');
    cy.screenshot('Test4')
  })

 //below code to display values of the headings
 it('Test if Column names are correct',()=>{

  const expectedColumnNames = ['Name', 'Phone', 'Email', 'Actions']
    cy.get("table>tbody>tr>th").each(($value,index,$total)=>{
      const actualColumnName=$value.text().trim()

      //Assert to check column name and number
      expect(actualColumnName).to.equal(expectedColumnNames[index]);
      
    })
    cy.screenshot('Test5')
 })
 

  it('Test Add and Read Record Functionality by utilizing Custom Command', () => {
    const name = 'Wills Sam';
    const number = '1234567890';
    const email = 'willis.sam@gmail.com';

    cy.addRecord(name, number, email);

    // Assert the record is added
    cy.assertRecordAdded(name, number, email);
    cy.screenshot('Test6')
  })

  it('Test if Edit Functionality',()=>{

    cy.addRecord('Roy', '9090989765', 'roy@gmail.com') //Adding new record
    cy.get('table>tbody')
    .contains('tr', 'Roy')
    cy.get('.btn-info').click(); 
    cy.get(':nth-child(2) > :nth-child(1) > input').clear().type('King Jhon'); //Modifying detail
    cy.get(':nth-child(4) > .btn').click();   

    // Assert that the contact name is updated
    cy.get('table>tbody').contains('tr', 'King Jhon')

    cy.screenshot('Test7')
  })
  
  it('Test if Delete Functionality',()=>{

    cy.addRecord('Jems', '9090989765', 'roy@gmail.com') //Adding new record to delete
    cy.get('table>tbody')
    .contains('tr', 'Jems')
    cy.get('.btn-danger')
    .click(); 
    // Assert that the contact name is updated
    cy.get('table>tbody>tr').should('not.have', 'Jems')

    cy.screenshot('Test8')
  })

  it('Add and Read multiple Records Using Array list and custom Command, Check No. of records',()=>{
    const records = [
      { name: 'Sam1', number: '1234567890', email: 'Sam2.doe@example.com' },
      { name: 'Sam2', number: '1234567891', email: 'Sam3.doe@example.com' },
      { name: 'Sam3', number: '1234567892', email: 'Sam4.doe@example.com' },
      { name: 'Sam4', number: '1234567893', email: 'Sam5.doe@example.com' },
      { name: 'Sam5', number: '1234567894', email: 'Sam6.doe@example.com' },
      { name: 'Sam6', number: '1234567895', email: 'Sam7.doe@example.com' },
      { name: 'Sam7', number: '1234567896', email: 'Sam8.doe@example.com' }
      
    ];
  
    records.forEach((record) => {
      
      cy.addMultipleRecords(record)
    })
  
    records.forEach((record) => {
      // Assert that the record is added
      cy.readMultipleRecords(record)
    }) 

    //Assert total number of records including title of the columns
    cy.get("table>tbody>tr").should('have.length',8) 
    cy.screenshot('Test9')
  })
  
})