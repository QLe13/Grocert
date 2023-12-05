Project setup:

db setup:
- create role and change application.conf db url to use role and corrent url
- download new_has.csv and put it in the sql dir, then cd to sql dir
- psql postgres:
    - DROP DATABASE grocery;
    - CREATE DATABASE grocery;
    - \q
- psql grocery
    - paste tables and GRANT lines from createandFill.sql
    - \q
- python fill_imgs.py
- psql grocery
    - paste the copy lines from createandFill.sql individually, the Has one will take a long time
 
image setup:
- copy images folder from sql to public
