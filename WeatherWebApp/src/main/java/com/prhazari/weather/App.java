package com.prhazari.weather;

import java.io.InputStream;

import java.util.List;
import java.util.ArrayList;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import java.io.File;

/**
 * Hello world!
 *
 */
public class App 
{
    private List<String> cityList;
    
    public App() {
        cityList = new ArrayList<String>();
    }
    
    public List<String> getCityList()
    {
        try
        {
            
            InputStream ins = App.class.getClassLoader().getResourceAsStream("CityList.xml");
            if ( ins == null )
            {
                System.out.println( "Failed!" );
                return cityList;
            }

            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(ins);

            doc.getDocumentElement().normalize();

            System.out.println("Root element :" + doc.getDocumentElement().getNodeName());

            NodeList nList = doc.getElementsByTagName("city");

            System.out.println("----------------------------");

            for (int temp = 0; temp < nList.getLength(); temp++) {

                Node cityNode = nList.item(temp);

                if (cityNode.getNodeType() != Node.ELEMENT_NODE ) {
                    continue;
                }

                Element cityElement = (Element)cityNode;
                String city = cityElement.getTextContent();

                System.out.println("City Name :" + city);

                cityList.add(city);
            }
            
            return cityList;
        }
        catch (SAXParseException err)
        {
            System.out.println("** Parsing error" + ", line "
                    + err.getLineNumber () + ", uri " + err.getSystemId ());
            System.out.println(" " + err.getMessage ());

        }
        catch (SAXException e)
        {
            Exception x = e.getException ();
            ((x == null) ? e : x).printStackTrace ();

        }
        catch (Throwable t)
        {
            t.printStackTrace();

        }
        finally {
            return cityList;
        }
    }    
}


