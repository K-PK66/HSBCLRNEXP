
# Managing & Navigating TCP/IP Networks

Crucial when developing the project.

> What's Internet exactly?

**Inter**net is a system where different networks are **connected with each other** by *protocols*, the common affair these networks can accept.

## Network Protocols

Networks use protocols to communicate. Network protocols define how systems can communicate and facilitate communications.

The fundamentals required to understand computer networking are the network model that contains both the functions of the layers and the protocols governing data transfer.

Use the instruction `ipconfig`, `ping` in shell to check info of network-related affairs of your PC.

## Layered Network Model

Used to...

- divide the complexity of networkn into many functions or layers
- enable changes or new features in 1 layer without having to change the other
- provide a standard
- simplify troubleshooting

<table>
<tr>
<th>TCP/IP</th><th>OSI Model</th><th>Protocols</th>
</tr>
<tr>
<td rowspan="3">Application Layer</td><td>Application Layer</td><td>DNS, DHCP, FTP, HTTPS, LDAP, NTP, POP3, RTP, RTSP, SSH, SIP, SMTP, Telnet, TFTP</td>
</tr>
<tr>
<td>Presentation Layer</td><td>jpeg, midi, mpeg, pict, tiff</td>
</tr>
<tr>
<td>Session Layer</td><td>netBIOS, NFS, PAP, SCP, SQL, zip</td>
</tr>
<tr>
<td>Transport Layer</td><td>Transport Layer</td><td>TCP, UDP</td>
</tr>
<tr>
<td>Internet Layer</td><td>Network Layer</td><td>ICMP, IGMP, IPsec, IPv4, IPv6, IPX, RIP</td>
</tr>
<tr>
<td rowspan="2">Link Layer</td><td>Data Link Layer</td><td>ARP, ATM, CDP, FDDI, Frame Relay, HDLC, MPLS, PPP, STP, Token Ring</td>
</tr>
<tr>
<td>Physical Layer</td><td>Bluetooth, Ethernet, DSL, ISDN, 802.11, Wi-Fi</td>
</tr>
</table>

## MAC address & Address Resolution Protocol (ARP)

ARP translates from IP addresses to MAC. It broadcasts on the network "*Who has x.x.x.x the IP address?*" the question and can send to the correct MAC address or gateway.

All hosts will receive the broadcast, and only the host which holds the IP address broadcasted will respond like "*This is x.x.x.x*" after the broadcast takes place.

## Internet Layer Protocol (IP)

Mainly functioned to connectionless delivery of datagrams on the network and fragmentation along with reassembly services.

> What is a *Connectionless* delivery?

*Connectionless* deliveries are those where those who make the request will only make a connection with the responder when the requestmaker wants to get sth. from the respondmaker.

Internet Control Message Protocol (or ICMP) enables a system to send control or error messages. Fragments occur when units of data are broken into smaller units of data, of which the size is determined by the Maximum Transmission Unit (or MTU, normally no more than 1500 bits) of the network interface and hardware layers.

IPv4 addresses are 32 bits in length. Each 8-bit field is represented by a decimal number between 0-255. Each IPv4 address identifies a network or a unique interface on that network. The value of high-order bit ones determine which portion of IPv4 address is the network number and which portion is the host number.

The network numbers can be divided into 3 classes with names A, B and C.

- Class A is in range 0-126, using 8 bits to indicate the network and 24 bits for host address.
- Class B is in range 128.0-191.254, using 16 bit to indicate the network and 16 bits for host address.
- Class C is in range 192.0.0 - 254.254.254, using 24 bits to indicate the network and 8 bits for host address.

> Some classfication approaches feature an additional Class D where Class C stops at 223.254.254.

127.- the IP address is employed as the **Loopback Adapter**, which is the reason why they are not classified as A/B/C.

Network Port number 3306, 8080, 8000 and 8888 is not recommended to use under real-life scenario developing.

## Subnets

An operation breaking a network into smaller pieces, done through a network mask that defines how much of the address is the network and how much is the host. For example, a class C network with the subnet mask of 255.255.255.0 means that 24 bits are used for the network and the last 8 bits are used for the host, meaning that the network features a capacity of 63 devices.

## Domain Name System (DNS)

Database for translating names to addresses and vice versa, distributed thoroughout the network with decentralized administration and faster lookups and also used in routing mail messages.

DNS are main means of resolving host names on the Internet where namespace is independent of underlyn network topology.

## Application layer

Handles the details of the particular application, primarily functions to format, present and transporting data. (e.g. Multipurpose Internet Mailing extension, or MIME)

***
