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

DROP TABLE IF EXISTS `account_classes`;

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

DROP TABLE IF EXISTS `account_info`;

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

DROP TABLE IF EXISTS `account_subclass`;

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

DROP TABLE IF EXISTS `account_types`;

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

DROP TABLE IF EXISTS `customer_info`;

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
  `balance` decimal(19,5) DEFAULT '0.00000',
  `created_by` int(11) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `date_modified` timestamp NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `deleted_by` int(11) DEFAULT NULL,
  `date_deleted` datetime DEFAULT NULL,
  `is_active` bit(1) DEFAULT b'1',
  `is_delete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

#
# Structure for the `department_info` table : 
#

DROP TABLE IF EXISTS `department_info`;

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

DROP TABLE IF EXISTS `journal_entries`;

CREATE TABLE `journal_entries` (
  `journal_id` bigint(20) DEFAULT '0',
  `account_id` int(11) DEFAULT '0',
  `debit_amount` decimal(15,2) DEFAULT NULL,
  `credit_amount` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Structure for the `journal_info` table : 
#

DROP TABLE IF EXISTS `journal_info`;

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

DROP TABLE IF EXISTS `product_info`;

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

DROP TABLE IF EXISTS `sales_invoice_info`;

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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

#
# Structure for the `sales_invoice_items` table : 
#

DROP TABLE IF EXISTS `sales_invoice_items`;

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

DROP TABLE IF EXISTS `supplier_info`;

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

DROP FUNCTION IF EXISTS `CreateInvoiceNo`;

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



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;