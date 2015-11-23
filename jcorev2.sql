# SQL Manager 2010 Lite for MySQL 4.6.0.5
# ---------------------------------------
# Host     : localhost
# Port     : 3306
# Database : jcorev2


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES latin1 */;

SET FOREIGN_KEY_CHECKS=0;

CREATE DATABASE `jcorev2`
    CHARACTER SET 'latin1'
    COLLATE 'latin1_swedish_ci';

USE `jcorev2`;

#
# Structure for the `account_classes` table : 
#

CREATE TABLE `account_classes` (
  `acc_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_class` varchar(65) DEFAULT NULL,
  `acc_type_id` int(11) DEFAULT NULL,
  `other_desc` varchar(500) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  `is_locked` bit(1) DEFAULT b'0',
  PRIMARY KEY (`acc_class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

#
# Structure for the `account_info` table : 
#

CREATE TABLE `account_info` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_no` varchar(30) DEFAULT NULL,
  `acc_title` varchar(75) DEFAULT NULL,
  `acc_class_id` int(11) DEFAULT NULL,
  `other_description` varchar(100) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `acc_no` (`acc_no`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

#
# Structure for the `account_subclass` table : 
#

CREATE TABLE `account_subclass` (
  `subclass_id` int(11) NOT NULL AUTO_INCREMENT,
  `subclass` varchar(75) DEFAULT NULL,
  `acc_type_id` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `is_active` bit(1) DEFAULT b'1',
  `is_locked` bit(1) DEFAULT b'0',
  PRIMARY KEY (`subclass_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

#
# Structure for the `account_types` table : 
#

CREATE TABLE `account_types` (
  `acc_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_type` varchar(30) DEFAULT NULL,
  `acc_description` varchar(100) DEFAULT NULL,
  `is_locked` bit(1) DEFAULT b'1',
  PRIMARY KEY (`acc_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Structure for the `customer_info` table : 
#

CREATE TABLE `customer_info` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(65) DEFAULT NULL,
  `lname` varchar(65) DEFAULT NULL,
  `mname` varchar(65) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  `billing_address` varchar(100) DEFAULT NULL,
  `pri_contact` varchar(30) DEFAULT NULL,
  `sec_contact` varchar(30) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

#
# Structure for the `department_info` table : 
#

CREATE TABLE `department_info` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department` varchar(100) DEFAULT NULL,
  `description` varchar(125) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

#
# Structure for the `journal_entries` table : 
#

CREATE TABLE `journal_entries` (
  `journal_id` bigint(20) DEFAULT '0',
  `account_id` int(11) DEFAULT '0',
  `debit_amount` decimal(15,2) DEFAULT NULL,
  `credit_amount` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Structure for the `journal_info` table : 
#

CREATE TABLE `journal_info` (
  `journal_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ref_no` varchar(30) DEFAULT NULL,
  `txn_date` date DEFAULT NULL,
  `department_id` int(11) DEFAULT '0',
  `customer_id` varchar(20) DEFAULT '0',
  `supplier_id` varchar(20) DEFAULT '0',
  `method` varchar(50) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`journal_id`),
  UNIQUE KEY `ref_no` (`ref_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

#
# Structure for the `product_info` table : 
#

CREATE TABLE `product_info` (
  `prod_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `prod_code` varchar(60) DEFAULT NULL,
  `prod_description` varchar(100) DEFAULT NULL,
  `prod_srp` decimal(16,2) DEFAULT '0.00',
  `prod_cost` decimal(16,2) DEFAULT '0.00',
  `unit_id` int(11) DEFAULT '0',
  `warn_qty` decimal(11,2) DEFAULT '0.00',
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  `is_inventory` bit(1) DEFAULT b'1',
  PRIMARY KEY (`prod_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

#
# Structure for the `sales_invoice_info` table : 
#

CREATE TABLE `sales_invoice_info` (
  `sales_invoice_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(35) DEFAULT NULL,
  `txn_date` datetime DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `bill_address` varchar(100) DEFAULT NULL,
  `ship_address` varchar(100) DEFAULT NULL,
  `invoice_amount` decimal(20,2) DEFAULT '0.00',
  `remarks` varchar(100) DEFAULT NULL,
  `is_active` bit(1) DEFAULT b'1',
  `is_deleted` bit(1) DEFAULT b'0',
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `created_by_user` int(11) DEFAULT NULL,
  `modified_by_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`sales_invoice_id`),
  UNIQUE KEY `invoice_no` (`invoice_no`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

#
# Structure for the `sales_invoice_items` table : 
#

CREATE TABLE `sales_invoice_items` (
  `sales_invoice_id` bigint(20) DEFAULT NULL,
  `prod_id` bigint(20) DEFAULT NULL,
  `item_qty` int(11) DEFAULT '0',
  `item_discount` decimal(20,2) DEFAULT '0.00',
  `item_unit_price` decimal(20,2) DEFAULT '0.00',
  `item_line_total` decimal(20,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Structure for the `supplier_info` table : 
#

CREATE TABLE `supplier_info` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier` varchar(100) DEFAULT NULL,
  `address` varchar(125) DEFAULT NULL,
  `email` varchar(65) DEFAULT NULL,
  `pri_contact` varchar(55) DEFAULT NULL,
  `sec_contact` varchar(55) DEFAULT NULL,
  `contact_person` varchar(75) DEFAULT NULL,
  `fax_no` varchar(30) DEFAULT NULL,
  `website` varchar(40) DEFAULT NULL,
  `tin_no` varchar(45) DEFAULT NULL,
  `is_vatted` bit(1) DEFAULT b'1',
  `date_created` datetime DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

#
# Definition for the `CreateInvoiceNo` function : 
#

CREATE DEFINER = 'root'@'localhost' FUNCTION `CreateInvoiceNo`()
    RETURNS varchar(20) CHARSET latin1
    NOT DETERMINISTIC
    CONTAINS SQL
    SQL SECURITY DEFINER
    COMMENT ''
BEGIN

  DECLARE vCtrLastVal DOUBLE;
    DECLARE vCurrentYear VARCHAR(5);
    
    SET vCurrentYear=CAST(YEAR(NOW())as CHAR); /*Returns 4 Digit Year*/
    SET vCtrLastVal=(SELECT IFNULL(MAX(m.Ctr),0)+1 FROM
    	(	
    		SELECT (CAST(REPLACE(invoice_no,CONCAT('INV',CAST(vCurrentYear AS CHAR),'-'),'')AS UNSIGNED))as Ctr 
        	FROM sales_invoice_info WHERE invoice_no LIKE CONCAT('INV',vCurrentYear,'%')
    	)
    	as m);/*will retrieve last counter value of evaluation no with current year prefix*/
        
    
	/*FORMAT  E[YEAR][COUNTER] ie. E2015-00001*/
  	RETURN CONCAT('INV',vCurrentYear,'-',LPAD(vCtrLastVal,5,0));
END;

#
# Data for the `account_classes` table  (LIMIT 0,500)
#

INSERT INTO `account_classes` (`acc_class_id`, `acc_class`, `acc_type_id`, `other_desc`, `date_created`, `date_modified`, `is_active`, `is_delete`, `is_locked`) VALUES 
  (1,'Current Assets',1,'Current assets are cash and any other assets that a company plans to either turn into cash or consume within one year or in the operating cycle of the asset, whichever is longer.','2015-10-20 16:15:11','2015-10-20 17:13:52',1,0,1),
  (2,'Non-current Assets',1,'Non-current assets are those that will not have their full value realized within 12 months of the balance sheet date','2015-10-20 16:15:18','2015-10-20 17:13:53',1,0,1),
  (3,'Current Liabilities',2,'Current liabilities are obligations a business owes within a year. ','2015-10-20 16:19:56','2015-10-20 17:12:29',1,0,1),
  (4,'Long-term Liabilities',2,'Long-term liabilities are liabilities with a future benefit over one year, such as notes payable that mature longer than one year.','2015-10-20 16:32:06','2015-10-20 17:12:29',1,0,1),
  (5,'Capital-Equity',3,'Capital account is one of the accounts in shareholders'' equity. Sole proprietorships have a single capital account in the owner''s equity. Partnerships maintain a capital account for each of the partners.','2015-10-20 16:35:12','2015-10-20 17:12:29',1,0,1),
  (6,'Income',4,'Income is the consumption and savings opportunity gained by an entity within a specified timeframe, which is generally expressed in monetary terms.','2015-10-20 17:08:34','2015-10-20 17:12:29',1,0,1),
  (7,'Expenses',5,' The economic costs that a business incurs through its operations to earn revenue.','2015-10-20 17:08:47','2015-10-20 17:12:29',1,0,1);
COMMIT;

#
# Data for the `account_info` table  (LIMIT 0,500)
#

INSERT INTO `account_info` (`account_id`, `acc_no`, `acc_title`, `acc_class_id`, `other_description`, `date_created`, `date_modified`, `is_active`, `is_delete`) VALUES 
  (1,'101','Petty Cash',1,'','2015-10-22 09:36:11','2015-10-22 09:48:25',1,0),
  (2,'102','Cash on Hand',1,'','2015-10-22 09:38:48','2015-10-22 09:39:38',1,0),
  (3,'103','Account Receivable',1,'','2015-10-22 09:40:21','0000-00-00 00:00:00',1,0),
  (4,'104','Supplies',1,'','2015-10-22 10:02:54','0000-00-00 00:00:00',1,0),
  (5,'106','Prepaid Insurance',1,'','2015-10-23 15:19:37','0000-00-00 00:00:00',1,0),
  (6,'107','Land',2,'','2015-10-23 15:20:21','0000-00-00 00:00:00',1,0),
  (7,'210','Notes Payable',3,'','2015-10-23 15:24:46','0000-00-00 00:00:00',1,0),
  (8,'215','Accounts Payable',3,'','2015-10-23 15:24:59','0000-00-00 00:00:00',1,0),
  (9,'220','Wages Payable',3,'','2015-10-23 15:25:16','0000-00-00 00:00:00',1,0),
  (10,'230','Interest Payable',3,'','2015-10-23 15:25:27','0000-00-00 00:00:00',1,0),
  (11,'240','Unearned Income',3,'','2015-10-23 15:25:38','0000-00-00 00:00:00',1,0),
  (12,'250','Mortgage Payable',3,'','2015-10-23 15:25:52','0000-00-00 00:00:00',1,0),
  (13,'300','Capital',5,'','2015-10-23 15:26:10','0000-00-00 00:00:00',1,0);
COMMIT;

#
# Data for the `account_subclass` table  (LIMIT 0,500)
#

INSERT INTO `account_subclass` (`subclass_id`, `subclass`, `acc_type_id`, `description`, `date_created`, `date_modified`, `is_active`, `is_locked`) VALUES 
  (1,'Machine',1,'',NULL,'2015-10-21 13:59:59',0,0),
  (2,'Building',1,'',NULL,'2015-10-21 14:00:15',0,0),
  (3,'Vehicle',1,'',NULL,'2015-10-21 14:00:17',0,0),
  (4,'Inventory',1,'',NULL,'2015-10-21 14:00:19',0,0),
  (5,'Cash',1,'',NULL,'2015-10-21 14:00:21',0,0),
  (6,'Receivables',1,'',NULL,'2015-10-21 14:01:06',0,0),
  (7,'Long Term Loan',2,'',NULL,'2015-10-21 14:01:30',0,0),
  (8,'Bank Overdraft',2,'When an individual or company takes out more from an account and the balance drops below the allowed amount by the financial institution.',NULL,'2015-10-21 13:59:36',0,0),
  (9,'Short Term Loan',2,'Expected to be paid back relatively quickly.',NULL,'2015-10-21 13:59:36',0,0),
  (10,'Payables',2,'A balance sheet item which equals the sum of all money owed by a company.',NULL,'2015-10-21 13:59:36',0,0),
  (11,'Debenture',2,'Unsecured debt backed only by the integrity of the borrower, not by collateral, and documented by an agreement called an indenture. One example is an unsecured bond.',NULL,'2015-10-21 13:59:36',0,0),
  (12,'Capital',3,'Capital',NULL,'2015-10-21 13:59:36',0,0),
  (13,'Sale Revenue',4,'Income earned in the ordinary course of the business activities of the entity.',NULL,'2015-10-21 13:59:36',0,0),
  (14,'Gains',4,'Income that does not arise from the core operations of the entity.',NULL,'2015-10-21 13:59:36',0,0),
  (15,'Salaries and wages',5,'',NULL,'2015-10-21 13:59:36',0,0),
  (16,'Utility expenses',5,'',NULL,'2015-10-21 13:59:36',0,0),
  (17,'Cost of goods sold',5,'',NULL,'2015-10-21 13:59:36',0,0),
  (18,'Administration expenses',5,'',NULL,'2015-10-21 13:59:36',0,0),
  (19,'Finance costs',5,'',NULL,'2015-10-21 13:59:36',0,0),
  (20,'Depreciation',5,'',NULL,'2015-10-21 13:59:36',0,0),
  (21,'Impairment losses',5,'',NULL,'2015-10-21 13:59:36',0,0);
COMMIT;

#
# Data for the `account_types` table  (LIMIT 0,500)
#

INSERT INTO `account_types` (`acc_type_id`, `acc_type`, `acc_description`, `is_locked`) VALUES 
  (1,'Asset','Asset',1),
  (2,'Liability','Liability',1),
  (3,'Capital','Capital',1),
  (4,'Income','Income',1),
  (5,'Expense','Expense',1);
COMMIT;

#
# Data for the `customer_info` table  (LIMIT 0,500)
#

INSERT INTO `customer_info` (`customer_id`, `fname`, `lname`, `mname`, `address`, `email`, `billing_address`, `pri_contact`, `sec_contact`, `company`, `date_created`, `date_modified`, `is_active`, `is_delete`) VALUES 
  (5,'Paul Christian','Rueda','Bontia','San Jose, San Simon, Pampanga','email 1111','San Jose, San Simon, Pampanga','contact no','contact alt','','2015-10-27 17:04:35','2015-11-09 19:45:52',1,0),
  (6,'Manny','Pacquiao 1','','San Jose, San Simon, Pampanga','','','','','','2015-11-09 19:45:43','2015-11-09 19:45:43',1,0),
  (7,'Christian','Rueda','','San Jose, San Simon, Pampanga','mayweather@yahoo.com','Pampanga','091111','0922221111','','2015-10-16 15:22:45','2015-10-27 11:43:27',1,0),
  (8,'Lucas','Mathysse','','San Jose, San Simon, Pampanga','Email','Billing','contact 1','contact 2','','2015-10-16 15:14:04','2015-10-27 11:43:27',1,0),
  (9,'Marcus','Maidana','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 15:14:13','2015-11-09 19:45:25',1,0),
  (10,'Juan','Dela Cruz','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 14:17:28','2015-10-27 11:43:27',1,0),
  (11,'Felix','Trinidad','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 15:09:53','2015-10-27 11:43:27',1,0),
  (12,'Juan Ponce','Enrile','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:31:42','2015-10-27 11:43:27',1,0),
  (13,'Nance','Nance','','San Jose, San Simon, Pampanga','email','billing','','','','2015-10-16 16:20:48','2015-11-05 13:19:20',1,0),
  (14,'John','Nicolas','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 15:11:41','2015-11-09 19:45:59',0,0),
  (15,'Regin','Calaguas','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 15:52:20','2015-10-27 11:43:27',1,0),
  (16,'Jordan','Lerit','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 15:52:27','2015-10-27 11:43:27',0,0),
  (17,'Erwin','Sanggalang','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 15:52:40','2015-10-27 11:43:27',0,0),
  (18,'add','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:07','2015-10-27 11:43:27',1,0),
  (19,'sdfs','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:11','2015-10-27 11:43:27',1,0),
  (20,'sdfd','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:38:29','2015-10-27 11:43:27',1,0),
  (21,'dfdfd','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:17','2015-10-27 11:43:27',1,0),
  (22,'dfsdf','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:20','2015-10-27 11:43:27',1,0),
  (23,'dfd','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:24','2015-10-27 11:43:27',1,0),
  (24,'dfd','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:34','2015-10-27 11:43:27',1,0),
  (25,'ddd','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:38','2015-10-27 11:43:27',1,0),
  (26,'bb','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:32:57','2015-10-27 11:43:27',1,0),
  (27,'fffffffffff','','','San Jose, San Simon, Pampanga','','','','','','2015-10-16 16:38:39','2015-10-27 11:43:27',1,0),
  (28,'Paul Chris','','','San Jose, San Simon, Pampanga','','','','','','2015-10-18 17:00:40','2015-10-27 11:43:27',1,0),
  (29,'Perry Dwight','David','','San Jose, San Simon, Pampanga','','','','','','2015-10-19 16:11:15','2015-10-27 11:43:27',1,0);
COMMIT;

#
# Data for the `department_info` table  (LIMIT 0,500)
#

INSERT INTO `department_info` (`department_id`, `department`, `description`, `address`, `date_created`, `date_modified`, `is_active`, `is_delete`) VALUES 
  (1,'Man Department','Located at Balibago, Angeles City.','Balibago, Angeles City',NULL,'2015-10-27 13:56:53',1,0);
COMMIT;

#
# Data for the `journal_entries` table  (LIMIT 0,500)
#

INSERT INTO `journal_entries` (`journal_id`, `account_id`, `debit_amount`, `credit_amount`) VALUES 
  (1,2,100000.00,0.00),
  (1,13,0.00,100000.00),
  (3,2,100000.00,0.00),
  (3,13,0.00,100000.00),
  (4,1,1000.00,0.00),
  (4,2,0.00,1000.00),
  (5,2,200.00,0.00),
  (5,5,0.00,200.00);
COMMIT;

#
# Data for the `journal_info` table  (LIMIT 0,500)
#

INSERT INTO `journal_info` (`journal_id`, `ref_no`, `txn_date`, `department_id`, `customer_id`, `supplier_id`, `method`, `memo`, `date_created`, `date_modified`, `is_active`, `is_delete`) VALUES 
  (1,'121','2015-10-01',1,'5','0','Not Applicable','','2015-10-29 11:10:19','0000-00-00 00:00:00',1,0),
  (3,'1212','2015-10-01',1,'5','0','Not Applicable','Mr. Rueda''s investment.','2015-10-29 13:30:10','2015-10-29 13:31:03',1,0),
  (4,'12345','2015-11-01',1,'5','0','Not Applicable','','2015-11-01 08:36:16','0000-00-00 00:00:00',1,0),
  (5,'12111','2015-10-28',1,'5','0','Not Applicable','','2015-11-15 10:32:15','0000-00-00 00:00:00',1,0);
COMMIT;

#
# Data for the `product_info` table  (LIMIT 0,500)
#

INSERT INTO `product_info` (`prod_id`, `prod_code`, `prod_description`, `prod_srp`, `prod_cost`, `unit_id`, `warn_qty`, `is_active`, `is_delete`, `is_inventory`) VALUES 
  (1,'1','Intel Quadcore CPU 3.2Ghz',5500.00,0.00,0,0.00,1,0,1),
  (2,'2','Video Card 2gb',2600.00,0.00,0,0.00,0,0,0);
COMMIT;

#
# Data for the `sales_invoice_info` table  (LIMIT 0,500)
#

INSERT INTO `sales_invoice_info` (`sales_invoice_id`, `invoice_no`, `txn_date`, `customer_id`, `bill_address`, `ship_address`, `invoice_amount`, `remarks`, `is_active`, `is_deleted`, `date_created`, `date_modified`, `created_by_user`, `modified_by_user`) VALUES 
  (37,'INV2015-00001','2014-03-04 00:00:00',6,'San Jose, San Simon, Pampanga','',0.00,'',1,0,'2015-11-20 16:08:46','2015-11-20 16:22:59',NULL,NULL),
  (38,'INV2015-00002','2014-03-04 00:00:00',10,'Philippines','',0.00,'',1,0,'2015-11-20 16:22:33','2015-11-20 16:23:24',NULL,NULL);
COMMIT;

#
# Data for the `sales_invoice_items` table  (LIMIT 0,500)
#

INSERT INTO `sales_invoice_items` (`sales_invoice_id`, `prod_id`, `item_qty`, `item_discount`, `item_unit_price`, `item_line_total`) VALUES 
  (37,1,1,200.00,5500.00,5300.00),
  (37,1,3,0.00,5500.00,16500.00),
  (37,1,2,0.00,5500.00,11000.00),
  (38,1,1,0.00,5500.00,5500.00),
  (38,1,100,0.00,5500.00,550000.00);
COMMIT;

#
# Data for the `supplier_info` table  (LIMIT 0,500)
#

INSERT INTO `supplier_info` (`supplier_id`, `supplier`, `address`, `email`, `pri_contact`, `sec_contact`, `contact_person`, `fax_no`, `website`, `tin_no`, `is_vatted`, `date_created`, `date_modified`, `is_active`, `is_delete`) VALUES 
  (28,'Paul Christian Rueda','San Jose, San Simon, Pampanga','chrisrueda14@gmail.com','na','','person','','','',1,'2015-10-24 19:53:51','2015-11-15 10:26:24',1,0),
  (29,'Christian Rueda','San Jose, San Simon, Pampanga','','091','','','','','',1,'2015-10-28 13:10:24','2015-10-28 13:10:24',1,0),
  (30,'Manny Pacquiao 1','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-11-09 16:28:48','2015-11-15 10:26:33',1,0),
  (31,'Floyd Mayweather','San Jose, San Simon, Pampanga','floyd@yahoo.com','na','','','','','',1,'2015-10-19 15:56:28','2015-10-27 11:43:34',1,0),
  (32,'Lucas Mathysse','San Jose, San Simon, Pampanga','mathysses@yahoo.com','na','','','','','',1,'2015-10-19 11:30:55','2015-10-27 11:43:34',1,0),
  (33,'Marcus Maidana','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-15 16:44:09','2015-10-27 11:43:34',1,0),
  (34,'Regin Calaguas','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-15 16:41:50','2015-10-27 11:43:34',1,0),
  (35,'Jojo Soliman','San Jose, San Simon, Pampanga','','1111','','','','','',1,'2015-10-16 09:52:36','2015-10-27 11:43:34',1,0),
  (36,'Erick','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-16 14:31:19','2015-10-27 11:43:34',1,0),
  (37,'Jordan Lerit','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-15 16:42:13','2015-10-27 11:43:34',1,0),
  (38,'Jay','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-15 16:42:17','2015-10-27 11:43:34',1,0),
  (39,'Dennis Sangalang 1','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-16 10:05:59','2015-10-27 11:43:34',1,0),
  (40,'Paolo 11111','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-16 10:07:05','2015-10-27 11:43:34',1,0),
  (41,'Irene Rueda','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-16 11:20:01','2015-10-16 11:20:01',1,0),
  (42,'Jennifer Rueda','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-15 16:48:19','2015-10-27 11:43:34',1,0),
  (43,'Hello Hi Hello','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-16 10:06:42','2015-10-27 11:43:34',1,0),
  (44,'Chris Rueda','San Jose, San Simon, Pampanga','chris14rueda18@gmail.com','na','','','','','',1,'2015-10-15 16:47:49','2015-10-27 11:43:34',0,0),
  (45,'Supplier 1','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-16 10:39:56','2015-10-27 11:43:34',1,0),
  (46,'Supplier 112','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-16 14:24:30','2015-10-27 11:43:34',1,0),
  (47,'Hello 1','San Jose, San Simon, Pampanga','','na','','','','','',1,'2015-10-19 11:31:05','2015-10-27 11:43:34',1,0);
COMMIT;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;